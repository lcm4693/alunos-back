import { Controller, Get, Post, Body } from '@nestjs/common';
import { LinkService } from './link.service';
import { EntradaLink } from 'src/dto/entrada-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('/criar')
  criarLink(@Body() link: EntradaLink) {
    return this.linkService.insert(link);
  }
  
  @Get('/links')
  getLinks() {
    return this.linkService.getAll();
  }
}
