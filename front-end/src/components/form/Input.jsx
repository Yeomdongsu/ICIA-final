import styled from 'styled-components'
import { formItemStyle } from '../../style/theme'

export default styled.input`
  border: 1px solid #ddd;
  font-size: ${(props) => props.theme.fontSize.md};
  ${formItemStyle};
`
