import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { SUPPORT_OPTIONS } from '../utils-menu';
import { TYPE_URL } from '../utils';

@Component({
  selector: 'cds-support',
  templateUrl: './cds-support.component.html',
  styleUrls: ['./cds-support.component.scss']
})
export class CdsSupportComponent implements OnInit {

  SUPPORT_OPTIONS = SUPPORT_OPTIONS
  cardOptions: { [key: string]: Array<{ key: string, label: string, icon: string, type: TYPE_URL, src?: string, description?: string, localIcon?: boolean }>}
  private logger: LoggerService = LoggerInstance.getInstance()
  
  constructor() { }

  ngOnInit(): void {
    console.log('[CDS-SUPPORT initttt]')
    this.cardOptions = SUPPORT_OPTIONS
    Object.keys(SUPPORT_OPTIONS).forEach(key => {
      this.cardOptions[key].map((el)=> {
        el.localIcon = false
        if(el.icon && el.icon.match(new RegExp(/(?=.*?assets|http|https\b)^.*$/))){
          el.localIcon =true
        }
      })
    })
    this.hideShowWidget("show")
  }

  private hideShowWidget(status: "hide" | "show") {
    try {
      if (window && window['tiledesk']) {
        this.logger.log('[CDS DSHBRD] HIDE WIDGET ', window['tiledesk'])
        if (status === 'hide') {
          window['tiledesk'].hide();
        } else if (status === 'show') {
          window['tiledesk'].show();
        }
      }
    } catch (error) {
      this.logger.error('tiledesk_widget_hide ERROR', error)
    }
  }

  ngOnDestroy(){
    this.hideShowWidget("hide")
  }

}
