import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moveisService: MoviesService){}

    @Get()
    getAll(): Movie[]{
        return this.moveisService.getAll();
    }

    @Get(":id")
    getOne(@Param("id") movieId: number): Movie{
        console.log(typeof movieId);
        return this.moveisService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData:CreateMovieDto){
        return this.moveisService.create(movieData);
    }

    @Delete(":id")
    remove(@Param("id") movieId: number){
        return this.moveisService.deleteOne(movieId);
    }

    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moveisService.update(movieId, updateData);
    }
}
