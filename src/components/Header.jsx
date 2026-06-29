import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
`;

export default function Component() {
  return (
    <nav>
      <StyledLink
        data-testid="link-mainQuestMenu"
        to="/tousCombos"
      >
        Toutes combinaisons
      </StyledLink>
    </nav>
  );
}
