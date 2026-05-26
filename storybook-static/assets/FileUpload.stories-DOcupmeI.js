import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./FileUpload-DaV7drKG.js";function i(e,t,n){return new File([new Uint8Array(t*1024)],e,{type:n})}var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{a=t(),n(),o={accept:`.jpg,.jpeg,.png,.pdf,.doc,.docx`,maxSizeMB:20,description:`JPEG, PNG, PDF, DOC and DOCX formats, up to 20 MB.`},s={title:`Form Components / FileUpload / FileUpload`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"FileUpload is a drag-and-drop file input with click-to-browse, file list preview, and built-in validation.\n\n**Behaviour:**\n- Click anywhere in the zone or the Browse button to open the system file picker\n- Drag files onto the drop zone — the border highlights on entry\n- Selected files appear below the zone as FileCards with name, size, and a remove button\n- `onChange` fires with the current valid `File[]` after every add or remove\n- Invalid files (wrong type or too large) are rejected and an error is shown — they are not added to the list\n- `error` (string) overrides internal validation errors\n\n**Validation:**\n- `accept` — passed to the `<input>` for the picker; also validated on drag-drop\n- `maxSizeMB` — files over the limit are rejected before `onChange` fires\n- `description` — human-readable format and size hint; always provide alongside `accept` and `maxSizeMB`\n\n**Upload state:**\n- `uploadProgress` — map of filename → 0–100; drives the FileCard progress bar\n- `uploadError` — map of filename → error message; switches the FileCard to error state"}}},args:o,argTypes:{accept:{control:`text`},maxSizeMB:{control:`number`},multiple:{control:`boolean`},description:{control:`text`},error:{control:`text`},helperText:{control:`text`},disabled:{control:`boolean`},defaultFiles:{table:{disable:!0}},uploadProgress:{table:{disable:!0}},uploadError:{table:{disable:!0}},onChange:{table:{disable:!0}}}},c={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{multiple:!1,disabled:!1},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},l={parameters:{docs:{description:{story:"Single file. `description` always shows accepted formats and size limit inside the zone."}}},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},u={parameters:{docs:{description:{story:"Set `multiple` to allow more than one file. Each selection appends to the list."}}},args:{multiple:!0,helperText:`Upload all supporting documents.`},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},d={parameters:{docs:{description:{story:`A single file has been selected. The FileCard appears below the zone.`}}},args:{defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`)]},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},f={parameters:{docs:{description:{story:`Multiple files selected. Each file gets its own card; remove any individually.`}}},args:{multiple:!0,defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`),i(`tax-statement.docx`,210,`application/vnd.openxmlformats-officedocument.wordprocessingml.document`),i(`profile-photo.jpg`,95,`image/jpeg`)]},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},p={parameters:{docs:{description:{story:"Pass `uploadProgress` (filename → 0–100) to show a LinearProgress bar on individual file cards. The remove button is hidden while uploading."}}},args:{multiple:!0,defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`),i(`tax-statement.docx`,210,`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)],uploadProgress:{"annual-report-2024.pdf":62}},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},m={parameters:{docs:{description:{story:`A file with progress at 100 transitions to the complete state.`}}},args:{defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`)],uploadProgress:{"annual-report-2024.pdf":100}},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},h={parameters:{docs:{description:{story:"Pass `uploadError` (filename → error message) to show the error state on a file card."}}},args:{multiple:!0,defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`),i(`tax-statement.docx`,210,`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)],uploadError:{"tax-statement.docx":`This file could not be processed. Please try again.`}},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},g={parameters:{docs:{description:{story:`Disabled state with a file already present. The zone and remove button are both inert.`}}},args:{disabled:!0,defaultFiles:[i(`annual-report-2024.pdf`,480,`application/pdf`)]},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},_={parameters:{docs:{description:{story:"Pass `error` as a string to show an external validation error. Overrides any internal validation message."}}},args:{error:`This file could not be processed. Try again.`},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},v={parameters:{docs:{description:{story:`All interactions are blocked. The zone and button are visually dimmed.`}}},args:{disabled:!0},decorators:[e=>(0,a.jsx)(`div`,{style:{width:520},children:(0,a.jsx)(e,{})})]},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    multiple: false,
    disabled: false
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Single file. \`description\` always shows accepted formats and size limit inside the zone.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Set \`multiple\` to allow more than one file. Each selection appends to the list.'
      }
    }
  },
  args: {
    multiple: true,
    helperText: 'Upload all supporting documents.'
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'A single file has been selected. The FileCard appears below the zone.'
      }
    }
  },
  args: {
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')]
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Multiple files selected. Each file gets its own card; remove any individually.'
      }
    }
  },
  args: {
    multiple: true,
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf'), mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'), mockFile('profile-photo.jpg', 95, 'image/jpeg')]
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Pass \`uploadProgress\` (filename → 0–100) to show a LinearProgress bar on individual file cards. The remove button is hidden while uploading.'
      }
    }
  },
  args: {
    multiple: true,
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf'), mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')],
    uploadProgress: {
      'annual-report-2024.pdf': 62
    }
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'A file with progress at 100 transitions to the complete state.'
      }
    }
  },
  args: {
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')],
    uploadProgress: {
      'annual-report-2024.pdf': 100
    }
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Pass \`uploadError\` (filename → error message) to show the error state on a file card.'
      }
    }
  },
  args: {
    multiple: true,
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf'), mockFile('tax-statement.docx', 210, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')],
    uploadError: {
      'tax-statement.docx': 'This file could not be processed. Please try again.'
    }
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with a file already present. The zone and remove button are both inert.'
      }
    }
  },
  args: {
    disabled: true,
    defaultFiles: [mockFile('annual-report-2024.pdf', 480, 'application/pdf')]
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Pass \`error\` as a string to show an external validation error. Overrides any internal validation message.'
      }
    }
  },
  args: {
    error: 'This file could not be processed. Try again.'
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'All interactions are blocked. The zone and button are visually dimmed.'
      }
    }
  },
  args: {
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 520
  }}><Story /></div>]
}`,...v.parameters?.docs?.source}}},y=[`Playground`,`Default`,`MultiFile`,`WithFile`,`WithMultipleFiles`,`Uploading`,`UploadComplete`,`UploadError`,`WithFileDisabled`,`ErrorState`,`Disabled`]}))();export{l as Default,v as Disabled,_ as ErrorState,u as MultiFile,c as Playground,m as UploadComplete,h as UploadError,p as Uploading,d as WithFile,g as WithFileDisabled,f as WithMultipleFiles,y as __namedExportsOrder,s as default};