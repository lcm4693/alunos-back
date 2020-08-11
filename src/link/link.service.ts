import { Injectable } from '@nestjs/common';
import { Link } from 'src/domain/link.domain';
import { EntradaLink } from 'src/dto/entrada-link.dto';

@Injectable()
export class LinkService {
  private links = new Array();

  constructor() {
    const link1 = new Link(
      1,
      'Estado de SP registra 420 mortes por coronavírus em 24 horas, segundo maior valor diário desde o início da pandemia',
      'https://s2.glbimg.com/2MXqGHp61Avf_sCFcci1VEczaXs=/0x0:6000x4000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/q/B/Ofj14cSUWPhP7EC2jFUw/age20200809006.jpg',
      'https://g1.globo.com/sp/sao-paulo/noticia/2020/08/11/estado-de-sp-registra-420-mortes-por-coronavirus-em-24-horas-segundo-maior-valor-diario-desde-o-inicio-da-pandemia.ghtml',
    );
    const link2 = new Link(
      2,
      'Vacina russa diz que teste no Brasil começa na quarta, mas Anvisa afirma que não recebeu pedido de pesquisa ou registro',
      'https://s2.glbimg.com/I26b_UNpJA-lFcGjIwvP29H7qgM=/0x0:5472x3648/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/b/C/jAA7TpQBeW7L9PnpGLSg/2020-07-29t144111z-1519332118-rc223i9anj06-rtrmadp-3-health-coronavirus-vaccines-access.jpg',
      'https://g1.globo.com/bemestar/vacina/noticia/2020/08/11/vacina-russa-nao-tem-pedido-de-pesquisa-ou-registro-no-brasil-diz-anvisa.ghtml',
    );

    this.links.push(link1);
    this.links.push(link2);
  }

  getAll() {
    return this.links;
  }

  insert(entradaLink: EntradaLink): Link {
    const link = new Link(
      this.links.length + 1,
      entradaLink.titulo,
      entradaLink.imagemCapa,
      entradaLink.endereco,
    );
    this.links.push(link);

    return link;
  }
}
