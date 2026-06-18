import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import { Chip } from '../../components/Chip';
import { Icon } from '../../components/Icon';
import { TextButton } from '../../components/TextButton';
import { DescriptionList } from '../../components/DescriptionList';
import type { DescriptionListProps } from '../../components/DescriptionList';

type StoryArgs = DescriptionListProps & {
  widthMode?: 'equal' | 'fixedLabel' | 'fixedValue';
  widthValue?: number;
};

const meta: Meta<StoryArgs> = {
  title: 'Components / Description List / DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { widthMode: 'equal', widthValue: 200, responsive: true },
  argTypes: {
    title:      { control: 'text' },
    valueAlign: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Alignment of the value column. When set to right and responsive is enabled, values revert to left-aligned below the sm breakpoint. When responsive is disabled, right alignment persists at all screen sizes.',
    },
    density:    { control: 'select', options: ['condensed', 'default', 'spaced'] },
    responsive: {
      name: 'Responsive',
      control: 'boolean',
      description: 'When enabled, the label stacks above the value at xs breakpoint (below sm). Disable to keep the side-by-side layout at all screen sizes.',
    },
    labelFontWeight: {
      name: 'Label font weight',
      control: { type: 'select' },
      options: [400, 700],
      mapping: { 400: 400, 700: 700 },
      labels: { 400: 'Normal', 700: 'Bold' },
    },
    valueFontWeight: {
      name: 'Value font weight',
      control: { type: 'select' },
      options: [400, 700],
      mapping: { 400: 400, 700: 700 },
      labels: { 400: 'Normal', 700: 'Bold' },
    },
    widthMode: {
      name: 'Width mode',
      control: { type: 'select', labels: { equal: '50/50 (default)', fixedLabel: 'Fixed label width', fixedValue: 'Fixed value width' } },
      options: ['equal', 'fixedLabel', 'fixedValue'],
      description: 'Pin one column to a fixed width. Value column fills remaining space when label is fixed, and vice versa.',
    },
    widthValue: {
      name: 'Column width (px)',
      control: { type: 'number' },
      description: 'Width in px applied to the pinned column.',
      if: { arg: 'widthMode', neq: 'equal' },
    },
    labelWidth:  { table: { disable: true } },
    valueWidth:  { table: { disable: true } },
    titleAction: { table: { disable: true } },
    children:    { table: { disable: true } },
    sx:          { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function resolveWidthProps({ widthMode, widthValue }: Pick<StoryArgs, 'widthMode' | 'widthValue'>) {
  const px = Number(widthValue) || 200;
  if (widthMode === 'fixedLabel') return { labelWidth: px };
  if (widthMode === 'fixedValue') return { valueWidth: px };
  return {};
}

/** Default with a title — mirrors the TTR pension use case. */
export const Default: Story = {
  args: { title: 'TTR pension' },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="TTR pension">
  <DescriptionList.Item label="Amount to roll to TTR pension" value="$1,142,160" />
  <DescriptionList.Item label="Minimum amount to retain in super" value="$118,673" />
  <DescriptionList.Item label="Recommended pension per annum" value="$32,330" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item label="Amount to roll to TTR pension" value="$1,142,160" />
        <DescriptionList.Item label="Minimum amount to retain in super" value="$118,673" />
        <DescriptionList.Item label="Recommended pension per annum" value="$32,330" />
      </DescriptionList>
    </Box>
  ),
};

/** No title — rows display without a heading, first row has no top border. */
export const NoTitle: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList>
  <DescriptionList.Item label="Account number" value="123 456 789" />
  <DescriptionList.Item label="Account type" value="Accumulation" />
  <DescriptionList.Item label="Investment option" value="Balanced" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item label="Account number" value="123 456 789" />
        <DescriptionList.Item label="Account type" value="Accumulation" />
        <DescriptionList.Item label="Investment option" value="Balanced" />
      </DescriptionList>
    </Box>
  ),
};

/** Right-aligned values — use for financial figures and numeric data. */
export const RightAligned: Story = {
  args: { title: 'TTR pension', valueAlign: 'right' },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="TTR pension" valueAlign="right">
  <DescriptionList.Item label="Amount to roll to TTR pension" value="$1,142,160" />
  <DescriptionList.Item label="Minimum amount to retain in super" value="$118,673" />
  <DescriptionList.Item label="Recommended pension per annum" value="$32,330" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item label="Amount to roll to TTR pension" value="$1,142,160" />
        <DescriptionList.Item label="Minimum amount to retain in super" value="$118,673" />
        <DescriptionList.Item label="Recommended pension per annum" value="$32,330" />
      </DescriptionList>
    </Box>
  ),
};

/** Rich values — ReactNode content on the right side. */
export const RichValues: Story = {
  args: { title: 'Contact details', widthMode: 'fixedLabel', widthValue: 176 },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="Contact details" labelWidth={176}>
  <DescriptionList.Item
    label="Mobile"
    value={
      <Box>
        <Box sx={{ fontWeight: 700 }}>0412 345 678</Box>
        <Box sx={{ mt: 0.5 }}>
          <Chip label="Verified" severity="success" size="small" icon={<Icon icon="circle-check" />} />
        </Box>
      </Box>
    }
    action={<TextButton label="Edit" hideIcon aria-label="Edit mobile" />}
  />
  <DescriptionList.Item
    label="Email"
    value={
      <Box>
        <Box sx={{ fontWeight: 700 }}>alex.nguyen@email.com</Box>
        <Box sx={{ mt: 0.5 }}>
          <Chip label="Unverified" severity="warning" size="small" icon={<Icon icon="circle-exclamation" />} />
        </Box>
      </Box>
    }
    action={<TextButton label="Edit" hideIcon aria-label="Edit email" />}
  />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item
          label="Mobile"
          value={
            <Box>
              <Box sx={{ fontWeight: 700 }}>0412 345 678</Box>
              <Box sx={{ mt: 0.5 }}><Chip label="Verified" severity="success" size="small" icon={<Icon icon="circle-check" />} /></Box>
            </Box>
          }
          action={<TextButton label="Edit" hideIcon aria-label="Edit mobile" />}
        />
        <DescriptionList.Item
          label="Email"
          value={
            <Box>
              <Box sx={{ fontWeight: 700 }}>alex.nguyen@email.com</Box>
              <Box sx={{ mt: 0.5 }}><Chip label="Unverified" severity="warning" size="small" icon={<Icon icon="circle-exclamation" />} /></Box>
            </Box>
          }
          action={<TextButton label="Edit" hideIcon aria-label="Edit email" />}
        />
      </DescriptionList>
    </Box>
  ),
};

/** Secondary text — `description` renders supporting context below the label or value. */
export const WithDescription: Story = {
  args: { title: 'Contribution details' },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="Contribution details">
  <DescriptionList.Item
    label="Employer SG contributions"
    description="Compulsory 11.5% of ordinary time earnings"
    value="$14,950 / year"
  />
  <DescriptionList.Item
    label="Voluntary contributions"
    description="Additional amounts you've chosen to contribute"
    value="$5,000 / year"
    valueDescription="Pre-tax salary sacrifice"
  />
  <DescriptionList.Item
    label="Total contributions"
    value="$19,950 / year"
    valueDescription="Includes employer and voluntary"
  />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item
          label="Employer SG contributions"
          description="Compulsory 11.5% of ordinary time earnings"
          value="$14,950 / year"
        />
        <DescriptionList.Item
          label="Voluntary contributions"
          description="Additional amounts you've chosen to contribute"
          value="$5,000 / year"
          valueDescription="Pre-tax salary sacrifice"
        />
        <DescriptionList.Item
          label="Total contributions"
          value="$19,950 / year"
          valueDescription="Includes employer and voluntary"
        />
      </DescriptionList>
    </Box>
  ),
};

/**
 * Column width — use the `Width mode` control to switch between equal columns, a fixed label
 * width, or a fixed value width. The relevant size input appears when a fixed mode is selected.
 */
export const ColumnWidth: Story = {
  args: { title: 'Account details', widthMode: 'fixedLabel', widthValue: 200 },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="Account details" labelWidth={200}>
  <DescriptionList.Item label="Name" value="Alex Nguyen" />
  <DescriptionList.Item label="Account number" value="123 456 789" />
  <DescriptionList.Item label="Membership type" value="Accumulation" />
  <DescriptionList.Item label="Date joined" value="14 February 2018" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item label="Name" value="Alex Nguyen" />
        <DescriptionList.Item label="Account number" value="123 456 789" />
        <DescriptionList.Item label="Membership type" value="Accumulation" />
        <DescriptionList.Item label="Date joined" value="14 February 2018" />
      </DescriptionList>
    </Box>
  ),
};

/** All three density options side by side — padding-y values for condensed (8px), default (12px), spaced (16px). */
export const Density: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 768 }}>
      {(['condensed', 'default', 'spaced'] as const).map((density) => (
        <Box key={density}>
          <DescriptionList title={`Density: ${density}`} density={density}>
            <DescriptionList.Item label="Amount to roll to TTR pension" value="$1,142,160" />
            <DescriptionList.Item label="Minimum amount to retain in super" value="$118,673" />
            <DescriptionList.Item label="Recommended pension per annum" value="$32,330" />
          </DescriptionList>
        </Box>
      ))}
    </Box>
  ),
};

/** Row with an action slot — an element rendered after the value. */
export const WithActions: Story = {
  args: { title: 'Personal details' },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList title="Personal details">
  <DescriptionList.Item
    label="Date of birth"
    value="12 March 1975"
    action={<TextButton label="Edit" hideIcon aria-label="Edit date of birth" />}
  />
  <DescriptionList.Item label="Tax file number" value="XXX XXX XXX" />
  <DescriptionList.Item label="Member since" value="January 2010" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList {...args} {...resolveWidthProps({ widthMode, widthValue })}>
        <DescriptionList.Item
          label="Date of birth"
          value="12 March 1975"
          action={
            <TextButton label="Edit" hideIcon aria-label="Edit date of birth" />
          }
        />
        <DescriptionList.Item label="Tax file number" value="XXX XXX XXX" />
        <DescriptionList.Item label="Member since" value="January 2010" />
      </DescriptionList>
    </Box>
  ),
};

/** Title action — an action (e.g. Edit button) rendered in the header row alongside the title. */
export const WithTitleAction: Story = {
  args: { title: 'Personal details' },
  parameters: {
    docs: {
      source: {
        code: `<DescriptionList
  title="Personal details"
  titleAction={<TextButton label="Edit" hideIcon aria-label="Edit personal details" />}
>
  <DescriptionList.Item label="Full name" value="Alex Nguyen" />
  <DescriptionList.Item label="Date of birth" value="12 March 1975" />
  <DescriptionList.Item label="Email address" value="alex.nguyen@email.com" />
  <DescriptionList.Item label="Mobile phone" value="0412 345 678" />
</DescriptionList>`,
      },
    },
  },
  render: ({ widthMode, widthValue, ...args }) => (
    <Box sx={{ maxWidth: 768 }}>
      <DescriptionList
        {...args}
        {...resolveWidthProps({ widthMode, widthValue })}
        titleAction={<TextButton label="Edit" hideIcon aria-label="Edit personal details" />}
      >
        <DescriptionList.Item label="Full name" value="Alex Nguyen" />
        <DescriptionList.Item label="Date of birth" value="12 March 1975" />
        <DescriptionList.Item label="Email address" value="alex.nguyen@email.com" />
        <DescriptionList.Item label="Mobile phone" value="0412 345 678" />
      </DescriptionList>
    </Box>
  ),
};

