/**
 * Provides a text writer that can indent new lines by a tab string token.
 */
export class IndentedStringWriter {
  private _buffer: string[] = [];
  private _indentSize: number;
  private _indentLevel: number = 0;
  private _offset: string = "";
  private _eol: string = "\r\n";

  /**
   * Gets the current indent level.
   */
  private get indentLevel() {
    return this._indentLevel;
  }

  /**
   * Sets the current indent level.
   */
  private set indentLevel(value: number) { 
    this._indentLevel = value < 0 ? 0 : value;
    this._offset = " ".repeat(this._indentLevel * this._indentSize);
  }

  /**
   * Gets the inner buffer array.
   */
  public get buffer(): readonly string[] {
    return this._buffer;
  }

  /**
   * Creates an instance of the IndentedStringWriter class.
   * @param indentSize the initial indent size in spaces.
   */
  public constructor(indentSize: number = 2) {
    this._indentSize = indentSize;
  }

  /**
   * Puts the tab string according to the indent level.
   */
  public outputTabs(): this {
    this._buffer.push(this._offset);
    return this;
  }

  /**
   * Writes the specified string values followed by a line terminator, to the buffer.
   * @param values The string values to write.
   */
  public writeLine(...values: string[]): this {
    this._buffer.push(this._offset);
    values.forEach(v => this._buffer.push(v));
    this._buffer.push(this._eol);
    return this;
  }

  /**
   * Writes the specified string values followed by a line terminator without tabs, to the buffer.
   * @param values The string values to write.
   */
  public writeLineNoTabs(...values: string[]): this {
    values.forEach(v => this._buffer.push(v));
    this._buffer.push(this._eol);
    return this;
  }

  /**
   * Writes the specified string values to the buffer.
   * @param values The string values to write.
   */
  public write(...values: string[]): this {
    values.forEach(v => this._buffer.push(v));
    return this;
  }

  /**
   * Increases the indent level.
   */
  public indent(): this {
    this.indentLevel++;
    return this;
  }

  /**
   * Decreases the indent level.
   */
  public unindent(): this {
    this.indentLevel--;
    return this;
  }

  /**
   * Generate a string representation of the writer inner buffer.
   */
  public toString() {
    return this._buffer.join("");
  }
}