import {IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMovieDto{
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;

    //false,true 차이점은?
    @IsOptional()
    @IsString({ each: true})
    readonly genres: string[];
}