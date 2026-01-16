import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    catch(err: unknown, host: ArgumentsHost): void;
}
