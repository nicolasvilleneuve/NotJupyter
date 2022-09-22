import path from "path";
import {Command} from "commander";
import {serve} from 'local-api';

interface LocalApiError {
    code: string;
}

const isProduction: boolean = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p --port <number>", 'Port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: {port: string})=> {
        const isLocalApiError = (err: any):err is LocalApiError => {
            return typeof err.code === 'string';
        }
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(`Opened ${filename} on port ${options.port}. Navigate to http://localhost:${options.port}`);
        } catch (err) {
            if (isLocalApiError(err)) {
                if (err.code === "EADDRINUSE") {
                    console.error("port is already in use. Please use another.")
                }
            } else if (err instanceof Error){
                const {message} = err;
                console.log(message);
            }
            process.exit(1);
        }
    });