import moment from 'moment';

export class Formatter {
  
  private format: string;

  constructor(format: string){
    this.format = format;
  }

  value(data: any){
    return moment(data).format(this.format);
  }
}