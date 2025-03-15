import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StocksService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * @param symbol name of the stock symbol
   * @returns a promise all data related to the stock symbol from the polygon API
   */
  async getStockPrice(symbol: string) {
    try {
      const url = `https://api.polygon.io/v2/last/trade/${symbol}?apiKey=${process.env.POLYGON_IO_API_KEY}`; //Construct the API URL and uses API_KEY from environment variables
      console.log('URLURLURL: ' + url.toString());
      const response = await firstValueFrom(this.httpService.get(url)); //Makes a get request to the polygon.io API
      return response?.data; //returns the data received from the API
    } catch (error) {
      console.error(`Error fetching stock price for ${symbol}:`, error.message);
      throw new Error('Failed to fetch stock price');
    }
  }
}
