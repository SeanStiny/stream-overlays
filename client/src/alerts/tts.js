import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Polly } from '@aws-sdk/client-polly';
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner';

const client = new Polly({
  region: 'eu-west-2',
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: 'eu-west-2' }),
    identityPoolId: 'eu-west-2:21dd2585-f50f-4802-a2b9-818a4f4ae38e',
  }),
});

export async function synthesize(text) {
  const params = {
    OutputFormat: 'mp3',
    SampleRate: '24000',
    Text: text,
    TextType: 'text',
    VoiceId: 'Brian',
    Engine: 'neural',
  };

  const url = await getSynthesizeSpeechUrl({ client, params });

  const audio = new Audio(url);
  return audio;
}
