import styled from 'styled-components';

const Footer = () => (
  <Wrapper>
    <Text>Taste the best pizza in town - Order Now!</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  margin: 0px auto;
  height: 100px;
`;
const Text = styled.p`
  background-color: var(--color-primary);
  color: var(--color-desert-sand);
  font-family: var(--font-heading);
  font-size: 35px;
  text-align: center;
  width: 100vw;
  height: 100%;
  padding: 30px;
`;

export default Footer;
