import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./role.decorator"
import { AuthGuard, IsPaid } from "@common/guards"
import { RolesGuard } from "@common/guards/role.guard"

export const Paid = (value: string[]) => {
    return applyDecorators(Roles(value), UseGuards(AuthGuard, RolesGuard,IsPaid))
}

/**
 * Paid(['Doctor'])
 */
