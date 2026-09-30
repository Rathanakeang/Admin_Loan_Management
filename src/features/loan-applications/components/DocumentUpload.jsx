import { Upload } from 'antd'
import Button from '@/components/common/Button/Button'
import FormSection from '@/components/common/FormSection/FormSection'

export default function DocumentUpload({ fileList = [], onChange }) {
  return (
    <FormSection step="03" title="Documents" description="Attach supporting files. They are stored with this application.">
      <Upload
        multiple
        beforeUpload={() => false}
        fileList={fileList}
        onChange={({ fileList: next }) => onChange(next)}
      >
        <Button variant="secondary">Attach documents</Button>
      </Upload>
    </FormSection>
  )
}
