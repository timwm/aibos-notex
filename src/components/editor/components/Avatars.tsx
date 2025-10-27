// import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";

export function Avatars() {
  // const users = useOthers(); // O11
  // const currentUser = useSelf(); // O11
  const users = [{ connectionId: 1, info: { avatar: "#", name: "Ab" } }];
  const currentUser = { info: { avatar: "#", name: "Me X" } };

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.avatar} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.avatar}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        alt={name}
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}
