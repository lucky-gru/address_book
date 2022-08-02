import styled from 'styled-components'

export const Form = styled.div`
  padding-top: 10px;
  margin-top: 10px;
`
export const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  & label {
    font-size: 1rem;
    font-family: 'Gotham';
    font-weight: 500;
    display: block;
    margin: 0 0 5px 15px;
    & span {
      font-size: 0.8rem;
      font-weight: 400;
    }
  }

  & > input[type='text'] {
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding: 0 12px;
    border-radius: 21px;
    display: block;
    background: #fff;
    border: 1px solid #c8c8c8;
    font-size: 1rem;
    font-weight: 500;
    color: #343a40;
  }

  & > span {
    margin: 5px 0 0 10px;
    display: inline-block;
    padding: 5px;
    border: 1px solid #ff4c50;
    color: #ff4c50;
    font-size: 1rem;
  }
`
export const Error = styled.span`
  margin: 15px 0 0 10px;
  display: inline-block;
  padding: 5px;
  border: 1px solid #ff4c50;
  color: #ff4c50;
  font-size: 1rem;
`
