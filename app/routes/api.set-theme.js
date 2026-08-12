import { getSession, commitSession } from '~/sessions.server';

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return new Response(JSON.stringify({ status: 'success' }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': await commitSession(session),
    },
  });
}
