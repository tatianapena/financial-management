import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';

@Controller('income')
export class IncomeController {
  @Post('/create')
  createIncome(@Res() res, @Body()createIncomeDTO) {
    return res.status(HttpStatus.OK).json({
      message: 'received',
    });
  }
}
