import { IsInt, IsString, Min } from 'class-validator'
export class CreateProductDto {
  @IsString()
  name: string

  @IsInt()
  @Min(1)
  price: number

  @IsString()
  description?: string
}
