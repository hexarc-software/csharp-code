export class IndentedStringWriter {
  private _buffer: string[] = [];
  private _indentSize: number;
  private _indentLevel: number = 0;
  private _offset: string = "";
  private _eol: string = "\r\n";

  private get indentLevel() {
    return this._indentLevel;
  }

  private set indentLevel(value: number) { 
    this._indentLevel = value < 0 ? 0 : value;
    this._offset = " ".repeat(this._indentLevel * this._indentSize);
  }

  public get buffer(): readonly string[] {
    return this._buffer;
  }

  public constructor(indentSize: number = 2) {
    this._indentSize = indentSize;
  }

  public outputTabs(): this {
    this._buffer.push(this._offset);
    return this;
  }

  public writeLine(...values: string[]): this {
    this._buffer.push(this._offset);
    values.forEach(v => this._buffer.push(v));
    this._buffer.push(this._eol);
    return this;
  }

  public writeLineNoTabs(...values: string[]): this {
    values.forEach(v => this._buffer.push(v));
    this._buffer.push(this._eol);
    return this;
  }

  public write(...values: string[]): this {
    values.forEach(v => this._buffer.push(v));
    return this;
  }

  public indent(): this {
    this.indentLevel++;
    return this;
  }

  public unindent(): this {
    this.indentLevel--;
    return this;
  }

  public toString() {
    return this._buffer.join("");
  }
}