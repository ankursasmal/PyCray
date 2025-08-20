// Mock feature flags endpoint
export const GET = async () => {
  return new Response(JSON.stringify({ flags: [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
