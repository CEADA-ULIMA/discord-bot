class Parser {

  static parse(args: string): string[] {
    const argsParsed: string[] = [];
    args = args.trim();
    let curr: string = '';
    let i = 0;
    let insideString = false;
    let stringChar;
    while (i < args.length) {
      if ((args[i] === "'" || args[i] === '"') && !insideString) {
        insideString = true;
        stringChar = args[i];
        i++;
        continue;
      } else if (args[i] === stringChar && insideString) {
        insideString = false; 
        stringChar = undefined;
        argsParsed.push(curr);
        curr = '';
        i++;
        continue;
      }
      if (args[i] === ' ' && !insideString) {
        if (curr.length > 0) {
          argsParsed.push(curr);
        }
        curr = '';
      } else {
        curr += args[i];
      }
      i++;
    }
    if (curr.length > 0) {
      argsParsed.push(curr);
    }
    return argsParsed;
  }
}

export default Parser;
