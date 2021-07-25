import styled from 'styled-components';
import { Organizer, ReferenceList } from '../constants/about';

const StyledFooter = styled.footer`
  width: 100%;
  /* height: 100px; */
  border-top: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  /* bottom: 0;
  position: absolute; */
`;

const ProjectName = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <ProjectName>© {Organizer}</ProjectName>
      <FooterItem>
        <a href={ReferenceList.forum} target="_blank" rel="noopener noreferrer">
          Forum{' '}
        </a>
        <a
          href={ReferenceList.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord{' '}
        </a>
        <a
          href={ReferenceList.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub{' '}
        </a>
      </FooterItem>
    </StyledFooter>
  );
}
