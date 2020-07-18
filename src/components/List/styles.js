import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  opacity: ${props => props.done ? 0.6 : 1};
  
  // União do flex-grow, flex-shrink, flex-basis.
  /* Mesma coisa de:
     flex-grow: 0;
     flex-shrink: 0;
     flex-basis: 320px;
  */
  flex: 0 0 320px;
  
  // flex-grow - determina a capacidade de um componente "esticar" mais do que o necessário.
  // flex-shrink - determina a capacidade de um componente "encolher" mais do que o necessário.
  // flex-basis - determina o tamanho base do elemento.
  
  // Listando todas as 'div' que antes dela tem outra 'div'. Ou seja, estilizando da segunda em diante.
  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    
    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }
    
    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
      
      :hover {
        opacity: 0.7;
      }
    }
  }
  
    
  ul {
    margin-top: 30px;
  }
`;
