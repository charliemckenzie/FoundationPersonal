// Single source of truth for Foundation component status.
//
// Extracted from `index.mdx` so two consumers can share it without parsing MDX:
//   - `index.mdx` (the Storybook "Component Status" table) imports it.
//   - `scripts/generate-codemap.ts` overlays this status onto code-derived nodes.
//
// Status is a human judgment Willie owns — never re-inferred from code. Add a row
// here when a component is created (the codemap integrity check flags any code dir
// with no entry, and any entry with no code).

export type ComponentStatus = 'stable' | 'review' | 'draft';

export interface ComponentStatusEntry {
  name: string;
  status: ComponentStatus;
  /** Storybook story path for the component's default story. */
  story: string;
}

export const COMPONENTS: ComponentStatusEntry[] = [
  { name: 'BarChart',          status: 'draft',  story: '/?path=/story/components-charts-barchart--default' },
  { name: 'LineChart',         status: 'draft',  story: '/?path=/story/components-charts-linechart--default' },
  { name: 'Accordion',         status: 'stable', story: '/?path=/story/components-expandable-accordion--default' },
  { name: 'AddressField',      status: 'draft',  story: '/?path=/story/form-components-addressfield--default' },
  { name: 'Alert',             status: 'review', story: '/?path=/story/components-alert--default' },
  { name: 'ActionBar',         status: 'draft',  story: '/?path=/story/components-action-bar--default' },
  { name: 'AnnouncementBanner', status: 'draft', story: '/?path=/story/components-announcement-banner--default' },
  { name: 'ArtieAIButton',    status: 'draft',  story: '/?path=/story/components-buttons-artieai-button--default' },
  { name: 'Autocomplete',      status: 'draft',  story: '/?path=/story/form-components-autocomplete--default' },
  { name: 'Badge',             status: 'review', story: '/?path=/story/components-badge--default' },
  { name: 'Breadcrumb',        status: 'draft',  story: '/?path=/story/public-web-breadcrumb--default' },
  { name: 'Button',            status: 'stable', story: '/?path=/story/components-buttons-button--default' },
  { name: 'Calendar',          status: 'draft',  story: '/?path=/story/form-components-date-calendar--default' },
  { name: 'Card',              status: 'draft',  story: '/?path=/story/components-card--contained' },
  { name: 'Checkbox',          status: 'stable', story: '/?path=/story/form-components-checkbox--default' },
  { name: 'Chip',              status: 'review', story: '/?path=/story/components-chip--default' },
  { name: 'DateOfBirthField',  status: 'draft',  story: '/?path=/story/form-components-textfield--specialized' },
  { name: 'DatePicker',        status: 'draft',  story: '/?path=/story/components-datepicker--default' },
  { name: 'DateRangePicker',   status: 'draft',  story: '/?path=/story/components-daterangepicker--default' },
  { name: 'Divider',           status: 'draft',  story: '/?path=/story/components-divider--default' },
  { name: 'Dialog',            status: 'draft',  story: '/?path=/story/components-dialog--default' },
  { name: 'Drawer',            status: 'draft',  story: '/?path=/story/components-drawer--default' },
  { name: 'ExpandableItem',    status: 'review', story: '/?path=/story/components-expandable-expandableitem--default' },
  { name: 'FileUpload',        status: 'draft',  story: '/?path=/story/form-components-fileupload-fileupload--default' },
  { name: 'Footer',            status: 'draft',  story: '/?path=/story/public-web-footer--default' },
  { name: 'Header',            status: 'stable', story: '/?path=/story/public-web-header--default' },
  { name: 'FormProgress',        status: 'stable', story: '/?path=/story/form-components-stepped-forms-formprogress--simple' },
  { name: 'StepperActions',     status: 'draft',  story: '/?path=/story/form-components-stepped-forms-stepperactions--states' },
  { name: 'HeroIcon',          status: 'draft',  story: '/?path=/story/components-icons-hero-icon--default' },
  { name: 'Icon',              status: 'draft',  story: '/?path=/story/components-icons-icon--default' },
  { name: 'IconButton',        status: 'stable', story: '/?path=/story/components-buttons-iconbutton--default' },
  { name: 'IconList',          status: 'draft',  story: '/?path=/story/components-iconlist--default' },
  { name: 'LinearProgress',    status: 'draft',  story: '/?path=/story/components-linearprogress--default' },
  { name: 'Logo',              status: 'draft',  story: '/?path=/story/components-logo--default' },
  { name: 'Menu',              status: 'draft',  story: '/?path=/story/components-menu--default' },
  { name: 'Modal',             status: 'draft',  story: '/?path=/story/utilities-modal--default' },
  { name: 'Pagination',        status: 'draft',  story: '/?path=/story/components-pagination--default' },
  { name: 'PasswordField',     status: 'draft',  story: '/?path=/story/form-components-textinput-passwordfield--default' },
  { name: 'MoneyField',        status: 'stable', story: '/?path=/story/form-components-textinput-moneyfield--default' },
  { name: 'PercentageField',   status: 'stable', story: '/?path=/story/form-components-textinput-percentagefield--default' },
  { name: 'QuickLinks',        status: 'draft',  story: '/?path=/story/public-web-section-navigation-tab--default' },
  { name: 'LinkRow',           status: 'draft',  story: '/?path=/story/member-online-target-state-linkrow--with-link' },
  { name: 'RadioGroup',        status: 'stable', story: '/?path=/story/form-components-radiogroup--default' },
  { name: 'Select',            status: 'review', story: '/?path=/story/form-components-select--default' },
  { name: 'SkipLinks',         status: 'stable', story: '/?path=/story/accessibility-skiplinks--default' },
  { name: 'Skeleton',          status: 'draft',  story: '/?path=/story/components-skeleton--default' },
  { name: 'Snackbar',          status: 'draft',  story: '/?path=/story/components-snackbar--default' },
  { name: 'Spinner',           status: 'draft',  story: '/?path=/story/components-spinner--default' },
  { name: 'Switch',            status: 'review', story: '/?path=/story/form-components-switch--default' },
  { name: 'Table',             status: 'draft',  story: '/?path=/story/components-tables-table--default' },
  { name: 'ResponsiveTable',   status: 'draft',  story: '/?path=/story/components-tables-responsive-table--default' },
  { name: 'DataGrid',          status: 'draft',  story: '/?path=/story/components-tables-datagrid--default' },
  { name: 'Tabs',              status: 'stable', story: '/?path=/story/components-tabs--default' },
  { name: 'TextArea',          status: 'draft',  story: '/?path=/story/form-components-textinput-textarea--default' },
  { name: 'TextButton',        status: 'stable', story: '/?path=/story/components-buttons-textbutton--default' },
  { name: 'TextField',         status: 'review', story: '/?path=/story/form-components-textfield--default' },
  { name: 'Tooltip',           status: 'draft',  story: '/?path=/story/components-tooltip--default' },
  { name: 'MemberOnlineLayout',status: 'draft',  story: '/?path=/story/member-online-memberonlinelayout--default' },
  { name: 'SideNav',           status: 'draft',  story: '/?path=/story/member-online-sidenav--default' },
  { name: 'MemberHeader',      status: 'draft',  story: '/?path=/story/member-online-memberheader--default' },
  { name: 'MobileHeader',      status: 'draft',  story: '/?path=/story/member-online-mobileheader--default' },
  { name: 'MobileNavDrawer',   status: 'draft',  story: '/?path=/story/member-online-mobilenavdrawer--default' },
  { name: 'MemberFooter',      status: 'draft',  story: '/?path=/story/member-online-memberfooter--default' },
  { name: 'NavItem',           status: 'draft',  story: '/?path=/story/member-online-navitem--default' },
  { name: 'NavFlyout',         status: 'draft',  story: '/?path=/story/member-online-navflyout--default' },
  { name: 'BalanceCard',       status: 'draft',  story: '/?path=/story/member-online-balancecard--default' },
  { name: 'UserChip',          status: 'draft',  story: '/?path=/story/member-online-userchip--default' },
  { name: 'MemberInfoCard',    status: 'draft',  story: '/?path=/story/member-online-memberinfocard--default' },
  { name: 'MemberSearchField', status: 'draft',  story: '/?path=/story/member-online-searchfield--default' },
  { name: 'ThemeSwitcher',     status: 'draft',  story: '/?path=/story/member-online-themeswitcher--default' },
];

export const STATUS_ORDER: Record<ComponentStatus, number> = { stable: 0, review: 1, draft: 2 };

export const STATUS_COLOR: Record<ComponentStatus, string> = { stable: '#2e7d32', review: '#f9a825', draft: '#c62828' };

export const COUNTS: Record<ComponentStatus, number> = COMPONENTS.reduce(
  (acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; },
  { stable: 0, review: 0, draft: 0 } as Record<ComponentStatus, number>,
);
