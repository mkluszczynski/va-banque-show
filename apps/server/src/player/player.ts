export class Player {
  public id: string;
  public nickname: string;

  constructor(id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
  }

  toString(): string {
    return `${this.nickname}#${this.id}`;
  }
}
