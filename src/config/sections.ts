import type { NavItem, SectionId } from '../types/content'

export const SECTION_DEFINITIONS = [
  { id: 'home', label: '主页', ariaLabel: '前往主页场景' },
  { id: 'profiles', label: '成员', ariaLabel: '前往成员介绍' },
  { id: 'ripples', label: '涟漪', ariaLabel: '前往内容卡片' },
  { id: 'work', label: '作品', ariaLabel: '前往作品展示' },
  { id: 'contact', label: '联系', ariaLabel: '前往联系表单' },
] as const satisfies readonly NavItem[]

export const SECTION_IDS = SECTION_DEFINITIONS.map(
  ({ id }) => id,
) as SectionId[]
