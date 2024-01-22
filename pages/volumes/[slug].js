import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { volumes } from "../../lib/data";
import styled, { css } from "styled-components";
import right from "@/public/images/arrow-right.svg";
import left from "@/public/images/arrow-left.svg";

export default function VolumeDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const volumeIndex = volumes.findIndex((volume) => volume.slug === slug);

  const volume = volumes[volumeIndex];
  const previousVolume = volumes[volumeIndex - 1];
  const nextVolume = volumes[volumeIndex + 1];

  if (!volume) {
    return null;
  }

  const { title, description, cover, books, color } = volume;
  console.log("color", color);
  const StyledSection = styled.div`
    background-color: ${(prop) =>
      prop.$backgroundcolor === "white" ? "white" : prop.$backgroundcolor};
  `;

  return (
    <>
      <Link href="/volumes">← All Volumes</Link>
      <h1>{title}</h1>
      <p>{description}</p>
      <StyledSection $backgroundcolor={color}>
        <ul>
          {books.map(({ ordinal, title }) => (
            <li key={title}>
              {ordinal}: <strong>{title}</strong>
            </li>
          ))}
        </ul>
        <Image
          src={cover}
          alt={`Cover image of ${title}`}
          width={140}
          height={230}
        />
      </StyledSection>
      {previousVolume ? (
        <div>
          <Link href={`/volumes/${previousVolume.slug}`}>
            <Image src={left} alt="next page" width={20} height={20} /> Previous
            Volume: {previousVolume.title}
          </Link>
        </div>
      ) : null}
      {nextVolume ? (
        <div>
          <Link href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title}{" "}
            <Image src={right} alt="next page" width={20} height={20} />
          </Link>
        </div>
      ) : null}
    </>
  );
}
