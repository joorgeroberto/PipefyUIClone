import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context'

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);
  console.log(listIndex);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex }, // tipo do item
    collect: monitor => ({ // Collect coleta informações sobre o Drag (por exemplo, diz se o usuário está arrastando o item ou não)
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) { // função usada quando passo um item por cima de outro. Indica qual card está sendo arrastado.
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect(); // Retorna o tamanho do elemento.
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset(); // Determina "o quanto do item eu já arrastei".
      const draggedTop = draggedOffset.y - targetSize.top;

      if(draggedIndex < targetIndex && draggedTop < targetCenter) { // Enquanto um item tá antes do outro ele não faz nada.
        return;
      }

      if(draggedIndex > targetIndex && draggedTop > targetCenter) { // Enquanto um item tá depois do outro ele não faz nada.
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex; // "Dizendo" ao item que ele trocou de posição. Fazendo isso, retira aquele erro do card ficar piscando.
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return(
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt=""/>}
    </Container>
  );
};
