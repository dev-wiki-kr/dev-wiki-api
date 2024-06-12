import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/autocomplete')
  async getAutoCompleteTitle(@Query('q') q: string) {
    return this.searchService.suggestTitles(q);
  }
}
