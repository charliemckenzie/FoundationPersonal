import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Box-Cj6TI_Dr.js";import{n as i,t as a}from"./FileCard-CterLT8F.js";function o(e,t,n){return new File([new Uint8Array(t*1024)],e,{type:n})}var s,c,l,u,d,f,p,m,h,g;e((()=>{s=t(),r(),i(),c=o(`annual-report-2024.pdf`,480,`application/pdf`),l={title:`Form Components / FileUpload / FileCard`,component:a,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"FileCard displays a single file entry within a FileUpload list.\n\n**States:**\n- `idle` — file selected, ready to upload\n- `uploading` — upload in progress; shows a LinearProgress bar and percentage\n- `complete` — upload finished; icon and size text turn green\n- `error` — upload failed; shows an error message below the filename\n\nPass `onRemove` to show the remove button. It is hidden while uploading."}}},decorators:[e=>(0,s.jsx)(`div`,{style:{width:520},children:(0,s.jsx)(e,{})})],argTypes:{status:{control:`select`,options:[`idle`,`uploading`,`complete`,`error`]},progress:{control:{type:`range`,min:0,max:100}},errorMessage:{control:`text`},disabled:{control:`boolean`},file:{table:{disable:!0}},onRemove:{table:{disable:!0}}},args:{file:c}},u={parameters:{docs:{description:{story:`File selected, ready to upload.`}}},args:{status:`idle`,onRemove:()=>{}}},d={parameters:{docs:{description:{story:`Upload in progress. Remove button is hidden until complete.`}}},args:{status:`uploading`,progress:62}},f={parameters:{docs:{description:{story:`Upload finished successfully. Icon and file size text are green.`}}},args:{status:`complete`,onRemove:()=>{}}},p={name:`Error`,parameters:{docs:{description:{story:`Upload failed. Error message shown below the filename.`}}},args:{status:`error`,errorMessage:`This file could not be processed. Please try again.`,onRemove:()=>{}}},m={parameters:{docs:{description:{story:`Disabled state. Remove button is inert.`}}},args:{status:`idle`,disabled:!0,onRemove:()=>{}}},h={name:`All States`,parameters:{docs:{description:{story:`All four states shown together for comparison.`}}},render:()=>(0,s.jsxs)(n,{sx:{display:`flex`,flexDirection:`column`,gap:1},children:[(0,s.jsx)(a,{file:c,status:`idle`,onRemove:()=>{}}),(0,s.jsx)(a,{file:c,status:`uploading`,progress:62}),(0,s.jsx)(a,{file:c,status:`complete`,onRemove:()=>{}}),(0,s.jsx)(a,{file:c,status:`error`,errorMessage:`This file could not be processed. Please try again.`,onRemove:()=>{}})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'File selected, ready to upload.'
      }
    }
  },
  args: {
    status: 'idle',
    onRemove: () => {}
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Upload in progress. Remove button is hidden until complete.'
      }
    }
  },
  args: {
    status: 'uploading',
    progress: 62
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Upload finished successfully. Icon and file size text are green.'
      }
    }
  },
  args: {
    status: 'complete',
    onRemove: () => {}
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Error',
  parameters: {
    docs: {
      description: {
        story: 'Upload failed. Error message shown below the filename.'
      }
    }
  },
  args: {
    status: 'error',
    errorMessage: 'This file could not be processed. Please try again.',
    onRemove: () => {}
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Disabled state. Remove button is inert.'
      }
    }
  },
  args: {
    status: 'idle',
    disabled: true,
    onRemove: () => {}
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    docs: {
      description: {
        story: 'All four states shown together for comparison.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  }}>\r
      <FileCard file={PDF} status="idle" onRemove={() => {}} />\r
      <FileCard file={PDF} status="uploading" progress={62} />\r
      <FileCard file={PDF} status="complete" onRemove={() => {}} />\r
      <FileCard file={PDF} status="error" errorMessage="This file could not be processed. Please try again." onRemove={() => {}} />\r
    </Box>
}`,...h.parameters?.docs?.source}}},g=[`Idle`,`Uploading`,`Complete`,`Error`,`Disabled`,`AllStates`]}))();export{h as AllStates,f as Complete,m as Disabled,p as Error,u as Idle,d as Uploading,g as __namedExportsOrder,l as default};