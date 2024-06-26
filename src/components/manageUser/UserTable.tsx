import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Center,
    Collapse,
    Dialog,
    Flex,
    Group,
    Menu,
    Table,
    Text,
    TextInput,
    rem,
} from "@mantine/core"
import { IconAdjustments } from "@tabler/icons-react"
import { FaBan, FaRegUser } from "react-icons/fa6"
import { modals } from "@mantine/modals"
import { BannedModal, UpdateRoleModal } from "."
import { UserRole } from "@/types/users/UserRole"
import { UserResponse } from "@/types/user"
import { useContext } from "react"
import { PAGE_SIZE, UserDataContext } from "@/pages/user"
import { UseListStateHandlers, useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/router"

interface IProps {}
function UserTable() {
    const {
        users,
        handlers,
    }: {
        users: UserResponse[]
        handlers: UseListStateHandlers<UserResponse>
    } = useContext(UserDataContext)
    const getRoleBadge = (role: string) => {
        return (
            <Badge
                variant="light"
                color={
                    role === "ADMIN"
                        ? "cyan"
                        : role === "STAFF"
                        ? "teal"
                        : role === "USER"
                        ? "green"
                        : "red"
                }
            >
                {UserRole[role as keyof typeof UserRole]}
            </Badge>
        )
    }

    const getBannedBadge = (banned: boolean) => {
        return (
            <Badge variant="outline" color={banned === true ? "red" : "teal"}>
                {banned === true ? "True" : "False"}
            </Badge>
        )
    }

    const handleUpdateRole = (index: number) => {
        modals.open({
            title: "Update Role",
            children: (
                <UpdateRoleModal
                    index={index}
                    users={users}
                    handlers={handlers}
                />
            ),
        })
    }

    const handleBannedUser = (index: number) => {
        modals.open({
            title: "Ban User",
            children: (
                <>
                    <BannedModal
                        index={index}
                        users={users}
                        handlers={handlers}
                    />
                </>
            ),
        })
    }

    const router = useRouter()
    const { page } = router.query
    const baseIndex = parseInt(page as string) * PAGE_SIZE - PAGE_SIZE + 1 || 1
    return (
        <>
            <Table miw={800} verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ width: rem(40) }}></Table.Th>
                        <Table.Th>#</Table.Th>
                        <Table.Th>User</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Banned</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users?.map((item, index) => (
                        <Table.Tr
                            key={item.id}
                            bg={
                                item.banned === false
                                    ? ""
                                    : "var(--mantine-color-red-light)"
                            }
                        >
                            <Table.Td></Table.Td>
                            <Table.Td>{baseIndex + index}</Table.Td>
                            <Table.Td>
                                <Group gap="sm" wrap="nowrap">
                                    <Avatar
                                        size={26}
                                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                        radius={26}
                                    />
                                    <Text size="sm" fw={500}>
                                        {item.username}
                                    </Text>
                                </Group>
                            </Table.Td>

                            <Table.Td>{item.email}</Table.Td>

                            <Table.Td>{getRoleBadge(item.role)}</Table.Td>
                            <Table.Td>{getBannedBadge(item.banned)}</Table.Td>
                            <Table.Td>
                                <Menu shadow="md" width={170}>
                                    <Menu.Target>
                                        <ActionIcon
                                            variant="light"
                                            aria-label="Settings"
                                        >
                                            <IconAdjustments
                                                style={{
                                                    width: "70%",
                                                    height: "70%",
                                                }}
                                                stroke={1.5}
                                            />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Item
                                            onClick={() =>
                                                handleUpdateRole(index)
                                            }
                                            leftSection={
                                                <FaRegUser
                                                    style={{
                                                        width: rem(14),
                                                        height: rem(14),
                                                    }}
                                                />
                                            }
                                        >
                                            Update Role
                                        </Menu.Item>

                                        {item.banned === false ? (
                                            <Menu.Item
                                                onClick={() => {
                                                    handleBannedUser(index)
                                                }}
                                                color="red"
                                                leftSection={
                                                    <FaBan
                                                        style={{
                                                            width: rem(14),
                                                            height: rem(14),
                                                        }}
                                                    />
                                                }
                                            >
                                                Banned
                                            </Menu.Item>
                                        ) : (
                                            <Menu.Item
                                                onClick={() => {
                                                    handleBannedUser(index)
                                                }}
                                                color="green"
                                                leftSection={
                                                    <FaBan
                                                        style={{
                                                            width: rem(14),
                                                            height: rem(14),
                                                        }}
                                                    />
                                                }
                                            >
                                                UnBanned
                                            </Menu.Item>
                                        )}
                                    </Menu.Dropdown>
                                </Menu>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            {users?.length === 0 && (
                <Center maw={1100} h={100}>
                    <Box>
                        <Text c={"red"} size="lg">
                            No Data Found
                        </Text>
                    </Box>
                </Center>
            )}
        </>
    )
}

export default UserTable
