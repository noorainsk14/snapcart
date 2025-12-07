
export type HandlerFn = (
  req: Request,
  context: Record<string, any>
) => Promise<Response>;

export const asyncHandler = (handler: HandlerFn): HandlerFn => {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error("API Error:", error);

      const status = error?.statusCode || 500;

      return new Response(
        JSON.stringify({
          success: false,
          message: error?.message || "Internal Server Error",
        }),
        {
          status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };
};
