import styled from "@emotion/styled"

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`
export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: 0.3s;
  border-radius: 3px;

  ${props =>
    props.collapse
      ? `
      padding: 8px;
      border: 1px solid #ddd;
      ${props =>
        props.focus &&
        `
          cursor: text;
          width: 5em;
        `}
      margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
      padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
      ::placeholder {
        color: #ccc;
      }
    `
      : `
  background: #efefef;
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`};
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: 3px;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid #ccc;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid #efefef;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: #0091ea;
      padding: 0.1em 0.4em;
      border-radius: 3px;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`
