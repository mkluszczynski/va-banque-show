export class Logger{
    constructor(
        private stack: string[]
    ){}

    log(message: string){
        console.log(`[LOG]${this.getStackText()} ${message}`)
    }

    warn(message: string){
        console.warn(`[WARN]${this.getStackText()} ${message}`) 
    }

    error(message: string, error?: Error){
        console.error(`[ERROR]${this.getStackText()} ${message}`, error)
    }

    context(stack: string){
        return new Logger([...this.stack, stack]) 
    }

    private getStackText(){
        return `[${this.stack.join("][")}]`
    }
}