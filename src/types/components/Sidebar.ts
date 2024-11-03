import { RotasEnum } from '@/types/enums/rotas-app-enum'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

export type SideItemProps = {
	href?: RotasEnum
} & MenuItem
