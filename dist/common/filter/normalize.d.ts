import { HttpException } from '@nestjs/common';
export declare const normalizeHttpException: (e: HttpException) => {
    message: string;
    errors: any[];
} | {
    message: any;
    errors?: undefined;
};
