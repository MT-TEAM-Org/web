import Filter from 'badwords-ko';
import badWords from './badwords.json';

class ProfanityFilter {
  private filter: Filter;
  private customWords: string[] = [];

  constructor() {
    this.filter = new Filter();
    this.initializeCustomWords();
  }

  // 기본 비속어 필터에 커스텀 단어 추가
  private initializeCustomWords() {
    this.filter.addWords(...badWords);
    this.customWords = [...badWords];
  }

  // 새로운 비속어 추가
  public addWords(...words: string[]) {
    const newWords = words.filter(word => 
      !this.customWords.includes(word) && !this.filter.list.includes(word)
    );
    
    if (newWords.length > 0) {
      this.filter.addWords(...newWords);
      this.customWords.push(...newWords);
    }
  }

  // 텍스트 필터링
  public clean(text: string): string {
    if (!text) return '';
    return this.filter.clean(text);
  }

  // 비속어가 포함되어 있는지 확인
  public isProfane(text: string): boolean {
    if (!text) return false;
    return this.filter.isProfane(text);
  }

  // 현재 커스텀 단어 목록 가져오기
  public getCustomWords(): string[] {
    return [...this.customWords];
  }
}

const profanityFilter = new ProfanityFilter();

export default profanityFilter;