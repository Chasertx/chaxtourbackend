import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stocks') //handles request to the /stocks route
export class StocksController {
  //injects stockservice to interact with the business logic that fetches stock prices
  constructor(private readonly stocksService: StocksService) {}
  /**
   * ensures that the route is protected,
   * meaning the user must be authenticated
   * using a valid jwt token. the authguard uses
   * the jwt strategy defined in JWTStrategy to
   * check the presence and validity of a JWT in
   * the request
   * @param symbol
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  //defines a route handler for Get /stocks:symbol
  @Get(':symbol')
  /**
   * Fetches stock price by calling the stocksService.getStockprice()
   * method and passing the symbol parameter. Returns the stock data
   */
  async getStock(@Param('symbol') symbol: string) {
    return this.stocksService.getStockPrice(symbol);
  }
}
