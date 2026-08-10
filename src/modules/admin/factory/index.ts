import { Injectable } from '@nestjs/common';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Admin } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminFactoryService {
  async update(user: any, updateAdminDto: UpdateAdminDto) {
    const admin = new Admin();
    admin.firstName = updateAdminDto.firstName || user.firstName;
    admin.lastName = updateAdminDto.lastName || user.lastName;
    admin.userName = updateAdminDto.userName || user.userName;
    admin.email = updateAdminDto.email || user.email;
    admin.password = updateAdminDto.password
      ? await bcrypt.hash(updateAdminDto.password, 10)
      : user.password;
    return admin;
  }
}
