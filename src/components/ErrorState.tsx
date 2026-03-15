import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  const isApiKey =
    message.toLowerCase().includes("api key") ||
    message.toLowerCase().includes("401");

  return (
    <section className="py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="font-serif text-2xl font-normal mb-2">
          {isApiKey ? "API Key Required" : "Something went wrong"}
        </h3>

        {isApiKey ? (
          <div className="text-sm text-muted-foreground space-y-4">
            <p>
              Add your Anthropic API key to run live market predictions.
            </p>
            <div className="text-left bg-muted rounded-xl p-4 font-mono text-xs space-y-1">
              <p className="text-muted-foreground"># 1. Create a .env file in project root</p>
              <p>VITE_ANTHROPIC_API_KEY=sk-ant-...</p>
              <p className="text-muted-foreground mt-2"># 2. Restart the dev server</p>
              <p>npm run dev</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your key at{" "}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2"
              >
                console.anthropic.com
              </a>
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-6">{message}</p>
        )}

        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </section>
  );
}
