import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.token.deleteMany()
  await prisma.invite.deleteMany()
  await prisma.account.deleteMany()
  await prisma.member.deleteMany()
  await prisma.project.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('sem_senha', 8)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    }
  })
  const user2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    }
  })
  const user3 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    }
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Member)',
      slug: 'acme-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user2.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'MEMBER' },
            { userId: user2.id, role: 'ADMIN' },
            { userId: user3.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user3.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
            {
              name: faker.lorem.words(),
              slug: faker.lorem.slug(),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                user2.id,
                user3.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: user.id, role: 'BILLING' },
            { userId: user2.id, role: 'MEMBER' },
            { userId: user3.id, role: 'ADMIN' },
          ],
        },
      },
    },
  })
}

seed()
