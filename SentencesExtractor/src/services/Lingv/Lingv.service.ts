import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LingvService {
  api = environment.lingvApiUrl;
  stopWordsStr: string;
  stopWords: Set<string>;
  wordsTrimmers: RegExp;

constructor(private http: HttpClient) { 
  this.stopWordsStr = `a,about,all,am,a,,a,d,a,y,are,as,at,be,bee,,but,by,ca,,could,do,for,from,has,have,i,if,i,,is,it,me,my,,o,,ot,of,o,,o,e,or,so,that,the,them,there,they,this,to,was,we,what,which,will,with,wou
    ld,you,а,будем,будет,будете,будешь,буду,будут,будучи,будь,будьте,бы,был,была,были,было,быть,в,вам,вами,вас,весь,во,вот,все,всё,всего,всей,всем,всём,всеми,всему,всех,всею,всея,всю,вся,вы,да,
    для,до,его,едим,едят,ее,её,ей,ел,ела,ем,ему,емъ,если,ест,есть,ешь,еще,ещё,ею,же,за,и,из,или,им,ими,имъ,их,к,как,кем,ко,когда,кого,ком,кому,комья,которая,которого,которое,которой,котором,кот
    орому,которою,которую,которые,который,которым,которыми,которых,кто,меня,мне,мной,мною,мог,моги,могите,могла,могли,могло,могу,могут,мое,моё,моего,моей,моем,моём,моему,моею,можем,может,можете
    ,можешь,мои,мой,моим,моими,моих,мочь,мою,моя,мы,на,нам,нами,нас,наса,наш,наша,наше,нашего,нашей,нашем,нашему,нашею,наши,нашим,нашими,наших,нашу,не,него,нее,неё,ней,нем,нём,нему,нет,нею,ним,
    ними,них,но,о,об,один,одна,одни,одним,одними,одних,одно,одного,одной,одном,одному,одною,одну,он,она,оне,они,оно,от,по,при,с,сам,сама,сами,самим,самими,самих,само,самого,самом,самому,саму,св
    ое,своё,своего,своей,своем,своём,своему,своею,свои,свой,своим,своими,своих,свою,своя,себе,себя,собой,собою,та,так,такая,такие,таким,такими,таких,такого,такое,такой,таком,такому,такою,такую,
    те,тебе,тебя,тем,теми,тех,то,тобой,тобою,того,той,только,том,томах,тому,тот,тою,ту,ты,у,уже,чего,чем,чём,чему,что,чтобы,эта,эти,этим,этими,этих,это,этого,этой,этом,этому,этот,этою,эту,я,мен
    і,наші,нашої,нашій,нашою,нашім,ті,тієї,тією,тії,теє`;

    this.stopWords = new Set<string>();
    this.stopWordsStr.split(',').forEach((w: string) => {
      if(w.length > 0){
        this.stopWords.add(w.toLowerCase().trim());
      }
    });

    // this.wordsTrimmers = /^[\/\\@#%^&*()\-_=+\[\]{}~±§<>]*(?<word>[a-zA-Zа-яА-Я0-9\-]+)[\/\\@#%^&*()\-_=+\[\]{}~±§<>]*$/
    this.wordsTrimmers = new RegExp('^[\\/\\\\@#%^&*()\\-_=+\\[\\]{}~±§<>]*(?<word>[a-zA-Zа-яА-Я0-9\\-]+)[\\/\\\\@#%^&*()\\-_=+\\[\\]{}~±§<>]*$');
}

  getWordForm(word: string) {
    return this.http.get(this.api + 'getWordForms?wordForm=' + word);
  }

  getRusStopWords(): Set<string> {
    return this.stopWords;
  }

  trimWord(wordRaw: string): string {
    const regexWordGroupName = 'word';
    let res = '';
    try {
      const matchArray = wordRaw.match(this.wordsTrimmers);
        res = matchArray.groups[regexWordGroupName];
    } catch (err) {
      // console.error(wordRaw);
      // console.error(err);
    }
    return res;
  }

}


