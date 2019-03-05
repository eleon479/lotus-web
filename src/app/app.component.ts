import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /* app settings */
  title = 'lotus-web';
  darkTheme = false;

  /* user data */
  userStockSymbol = 'SPY';

  fetchStock() {
    let apiUrl = this.getStockUrl('SPY');
    // http.get(getStockUrl(...));
  }

  getStockUrl(symbol: string) {

    let version = 'beta';
    let service = 'stock';
    let action = 'quote';
    let token = 'pk_1aa9b4e109f94cccadb1a8f3aa9f68cc';

    return `https://cloud.iexapis.com/${version}/${service}/${symbol}/${action}?token=${token}`;
  }

  toggleTheme() {

    let light = 'lotus-light-theme';
    let dark = 'lotus-dark-theme';

    if (!this.darkTheme) {
      document.getElementById('lotus-index').classList.remove(light);
      document.getElementById('lotus-index').classList.add(dark);
      this.darkTheme = true;
    } else {
      document.getElementById('lotus-index').classList.remove(dark);
      document.getElementById('lotus-index').classList.add(light);
      this.darkTheme = false;
    }

    console.log('theme has been toggled...');
  }

}
