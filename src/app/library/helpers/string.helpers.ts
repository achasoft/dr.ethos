export class StringHelpers {
  static readonly dot = '...';
  static format(input: string, args: any[]): string {
    return input.replace(/{(\d+)}/g, (match, num) => {
      return typeof args[num] !== 'undefined' ? String(args[num]) : match;
    });
  }
  static truncate(input: string, limit, middle): string {
    input = input || '';
    if (input.length < limit) {
      return input;
    }
    if (!middle) {
      return input.substring(0, limit - 3) + this.dot;
    }
    const mid = Math.round(limit / 2);
    return (
      input.substring(0, mid) + this.dot + input.substring(limit - mid - 3)
    );
  }
  static toKebabCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
