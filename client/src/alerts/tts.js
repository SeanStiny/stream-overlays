import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Polly } from '@aws-sdk/client-polly';
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner';

const client = new Polly({
  region: process.env.REACT_APP_POLLY_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: process.env.REACT_APP_POLLY_REGION }),
    identityPoolId: process.env.REACT_APP_POLLY_IDENTITY,
  }),
});

export async function synthesize(text) {
  const params = {
    OutputFormat: 'mp3',
    SampleRate: '24000',
    Text: text,
    TextType: 'text',
    VoiceId: 'Justin',
    Engine: 'neural',
  };

  const url = await getSynthesizeSpeechUrl({ client, params });

  const audio = new Audio(url);
  return audio;
}
