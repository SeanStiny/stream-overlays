import { createHmac, timingSafeEqual } from 'crypto';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { Alert } from './models/alerts';
import { Database } from './models/database';

// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

// Prepend this string to the HMAC that's created from the message
const HMAC_PREFIX = 'sha256=';

/**
 * Handle an eventsub notification.
 */
export function eventsub(
  req: Request,
  res: Response,
  io: Server,
  database: Database
) {
  const secret = process.env.EVENTSUB_SECRET || '';
  const message = getHmacMessage(req);
  const hmac = HMAC_PREFIX + getHmac(secret, message); // Signature to compare

  if (
    true ===
    verifyMessage(hmac, req.headers[TWITCH_MESSAGE_SIGNATURE] as string)
  ) {
    console.log('signatures match');

    // Get JSON object from body, so you can process the message.
    const notification = JSON.parse(req.body);

    if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TYPE]) {
      const event = notification.event;

      switch (notification.subscription.type) {
        case 'channel.follow': {
          const alert = new Alert(
            new Date().getTime(),
            'follow',
            event.user_name
          );

          database.alerts
            ?.findOne('follow', event.user_name)
            .then((oldAlert) => {
              if (oldAlert === null) {
                io.emit('alert', alert, false);
              }
              database.alerts?.insert(alert);
            });
          break;
        }

        case 'channel.subscription.gift': {
          const alert = new Alert(
            new Date().getTime(),
            'gift',
            event.user_name,
            event.total
          );

          database.alerts?.insert(alert);
          io.emit('alert', alert, true);
          break;
        }

        case 'channel.subscription.message': {
          const alert = new Alert(
            new Date().getTime(),
            'resub',
            event.user_name,
            event.cumulative_months
          );

          database.alerts?.insert(alert);
          io.emit('alert', alert, true);
          break;
        }

        /*case 'channel.subscribe': {
          const alert = new Alert(
            new Date().getTime(),
            'sub',
            event.user_name,
            1
          );

          database.alerts?.insert(alert);
          io.emit('alert', alert, true);
          break;
        }*/

        case 'channel.cheer': {
          const alert = new Alert(
            new Date().getTime(),
            'cheer',
            event.user_name,
            event.bits
          );

          database.alerts?.insert(alert);
          io.emit('alert', alert, alert.amount && alert.amount > 50);
          break;
        }

        case 'channel.raid': {
          const alert = new Alert(
            new Date().getTime(),
            'raid',
            event.from_broadcaster_user_name,
            event.viewers
          );

          database.alerts?.insert(alert);
          io.emit('alert', alert, false);
          break;
        }
      }

      console.log(`Event type: ${notification.subscription.type}`);
      console.log(JSON.stringify(notification.event, null, 4));

      res.sendStatus(204);
    } else if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
      res.status(200).send(notification.challenge);
    } else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
      res.sendStatus(204);

      console.log(`${notification.subscription.type} notifications revoked!`);
      console.log(`reason: ${notification.subscription.status}`);
      console.log(
        `condition: ${JSON.stringify(
          notification.subscription.condition,
          null,
          4
        )}`
      );
    } else {
      res.sendStatus(204);
      console.log(`Unknown message type: ${req.headers[MESSAGE_TYPE]}`);
    }
  } else {
    console.log('403'); // Signatures didn't match.
    res.sendStatus(403);
  }
}

// Build the message used to get the HMAC.
function getHmacMessage(request: Request) {
  return (
    (request.headers[TWITCH_MESSAGE_ID] as string) +
    (request.headers[TWITCH_MESSAGE_TIMESTAMP] as string) +
    request.body
  );
}

// Get the HMAC.
function getHmac(secret: string, message: string) {
  return createHmac('sha256', secret).update(message).digest('hex');
}

// Verify whether your signature matches Twitch's signature.
function verifyMessage(hmac: string, verifySignature: string) {
  console.log(`hmac: ${hmac}`);
  console.log(`verifySig: ${verifySignature}`);
  return timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}
