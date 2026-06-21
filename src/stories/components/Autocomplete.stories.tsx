import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Autocomplete, type AutocompleteOption } from '../../components/Autocomplete';

const FRUIT_OPTIONS: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const FEATURED_CODES = new Set(['AU', 'NZ', 'GB']);

const ALL_COUNTRIES: AutocompleteOption[] = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BN', label: 'Brunei' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'CV', label: 'Cabo Verde' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'SZ', label: 'Eswatini' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GR', label: 'Greece' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Laos' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia' },
  { value: 'MD', label: 'Moldova' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russia' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'VC', label: 'Saint Vincent and the Grenadines' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'SS', label: 'South Sudan' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syria' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
];

const FEATURED_OPTIONS = ALL_COUNTRIES.filter((c) => FEATURED_CODES.has(c.value));
const NON_FEATURED_OPTIONS = ALL_COUNTRIES.filter((c) => !FEATURED_CODES.has(c.value));
const COUNTRY_OPTIONS: AutocompleteOption[] = [...FEATURED_OPTIONS, ...NON_FEATURED_OPTIONS];

const meta: Meta<typeof Autocomplete> = {
  title: 'Form Components / Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Autocomplete is a searchable dropdown. Users type to filter a list of options — best when typing is faster than scrolling.

For short, fixed lists (under ~10 options), use \`Select\` instead. For complex grouped lists or custom option rendering, use the \`groupBy\` and \`renderOption\` props.
        `.trim(),
      },
    },
  },
  args: {
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  argTypes: {
    size: { table: { disable: true } },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    onChange: { table: { disable: true } },
    renderOption: { table: { disable: true } },
    id: { table: { disable: true } },
    name: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  args: {
    label: 'Label',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when the option list is too long to browse by scrolling — typically more than 10–15 options. For short, fixed lists use `Select` instead.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Search…' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `helperText` for persistent guidance displayed beneath the field.',
      },
    },
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    helperText: 'Start typing to filter options.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set `error` when validation fails. Pair with `helperText` to explain what went wrong.',
      },
    },
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: true,
    helperText: 'Please select an option.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const ErrorWithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field.',
      },
    },
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: true,
    helperText: 'Start typing to filter options.',
    errorMessage: 'Please select an option.',
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `required` to mark mandatory fields.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, placeholder: 'Search…', required: true },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use `disabled` when the field is not editable in the current state.',
      },
    },
  },
  args: { label: 'Fruit', options: FRUIT_OPTIONS, defaultValue: FRUIT_OPTIONS[0], disabled: true },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Loading: Story = {
  args: { label: 'Fruit', options: [], placeholder: 'Search…', loading: true },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        story: 'Pass `loading` when options are being fetched asynchronously. The listbox shows a loading indicator while the options array is empty.',
      },
    },
  },
};

function FlagImg({ code, label }: { code: string; label: string }) {
  const base = code.toLowerCase();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading="lazy"
      width="20"
      height="15"
      src={`https://flagcdn.com/w20/${base}.png`}
      srcSet={`https://flagcdn.com/w40/${base}.png 2x`}
      alt={label}
      style={{ display: 'block', objectFit: 'cover' }}
    />
  );
}

function CountrySelectDemo() {
  const [value, setValue] = useState<AutocompleteOption | null>(null);
  return (
    <div style={{ width: 360 }}>
      <Autocomplete
        label="Country"
        options={COUNTRY_OPTIONS}
        value={value}
        onChange={setValue}
        placeholder="Search for a country…"
        helperText={value ? `Selected: ${value.label}` : 'Start typing to search'}
        groupBy={(option) => (FEATURED_CODES.has(option.value) ? 'Commonly Selected' : 'All Countries')}
        renderOption={(props, option) => (
          <li {...props} key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1rem' }}>
            <FlagImg code={option.value} label={option.label} />
            {option.label}
          </li>
        )}
      />
    </div>
  );
}

export const CountrySelect: Story = {
  render: () => <CountrySelectDemo />,
  parameters: {
    docs: {
      description: {
        story: [
          'A searchable country picker with flag images rendered via `renderOption`.',
          '',
          'Type any part of the country name to filter. Flag images are served from flagcdn.com using the ISO 3166-1 alpha-2 country code.',
        ].join('\n'),
      },
    },
  },
};
