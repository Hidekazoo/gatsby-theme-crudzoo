import * as React from "react"
import { Link } from "gatsby"
import styled from "../styles/styled"

interface IProps {
  tags: string[] | null
}

const TagListContainer = styled.div`
  margin: 15px 0 30px;
`
const Tag = styled(Link)`
  background: var(--tagBg);
  padding: 5px 10px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  margin-right: 10px;
`

const TagList: React.FC<IProps> = ({ tags }) => {
  if (tags === null) return <div />

  return (
    <TagListContainer>
      {tags.map(tag => (
        <Tag key={tag} to={"/tags/" + tag}>
          {tag}
        </Tag>
      ))}
    </TagListContainer>
  )
}

export default TagList
