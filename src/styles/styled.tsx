import styled, { CreateStyled } from "@emotion/styled"

type Theme = {
  color: {
    primary: string
    positive: string
    negative: string
  }
}

export default styled as CreateStyled<Theme>
