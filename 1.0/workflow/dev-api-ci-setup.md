# API CI (Continuous integration)

## Prerequisites

Before you start, you need the following:

- Forge account credentials 
- A Forge active plan (the basic one works)
- AWS IAM user key/secret 

## Forge 

[https://forge.laravel.com/](https://forge.laravel.com/)

[A tool](https://forge.laravel.com/) Provision and deploy unlimited PHP applications on DigitalOcean, Linode, Vultr, Amazon and more.

## What services to use?

[Here](https://www.guru99.com/digitalocean-vs-aws.html) is a good resource to see differences [DigitalOcean](https://www.digitalocean.com/) vs [AWS](https://aws.amazon.com/). These are the conclusions: 

- DigitalOcean provides Infrastructure as a Service (IaaS) whereas AWS provides Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS).
- DigitalOcean is a simple cloud service provider while Amazon Web Service(AWS) is a platform that offers flexible, reliable, scalable, easy-to-use, and cost-effective cloud computing solutions.
- DigitalOcean offers Auto-scaling, reliable, easy management, on the other hand, AWS offers Simple dashboard, Great community, Easy Configuration and many more.
- DigitalOcean is more suitable for developers and small applications while AWS is suitable for big scalable applications.

## AWS setup

Usually we're using AWS, unless the client want to use DO.

### IAM user

For Laravel Forge, there is necessary to setup a provider [here](https://forge.laravel.com/user/profile#/providers). Since you don't want to provide root aws account key/secret, you will have to create an IAM user.

1. [Access IAM users service on AWS](https://console.aws.amazon.com/iam/home?region=us-east-1#/users)

2. Choose programmatic access:

![IAM user step programmatic](./img/aws-iam-user-1.png)

3. Select permissions for the user:

`AmazonEC2FullAccess`

![Full access to EC2](./img/aws-iam-user-permission1.png)

`AmazonVPCFullAccess`


![Full access to VPC](./img/aws-iam-user-permission2.png)

4. Review and create:

![Review user](./img/aws-iam-user-last-step.png)


After creating user, you have to generate an key/secret for this user and use it forge provider:

![Key/Secret](./img/aws-iam-user-key.png)


:::warning Download credentials
Download the `csv` with key and secret, because after you will close the generation modal, you will not longer be able to see you secret.
:::

5. Now you can add these credentials into your forge [Server Providers](https://forge.laravel.com/user/profile#/providers).

:::tip  Server creation
Now you should be able to create a new AWS server.
:::


### Choose EC2

Choosing a right EC2 instance for your `development` app is an important step. This depends on your application requirements (maybe you need more CPU or more RAM). Bellow is a short list with AWS available EC2 variations (under Ubuntu Server 18.04 LTS):

![AWS EC2 Varation](./img/aws-ec2-variation.png)

Usually we're using `t2.micro` (it has a free tier for a limit of usage/month) or `t3.small`. That's because we have the database on the same EC2 server, so its processes consume RAM. So if you expect to have a lot of process at the DB layer, just use: `t3.small`.

Recently we had a problem, that we had a `t2.micro`, and we had some chat functionality on the server which uses [pusher](https://dashboard.pusher.com/) under the hood. At some point the server just crashed because of too much requests (I guess) and to less RAM. So we had to increase it to a `t3.small`. 

:::warning Change EC2 after creation
You can increase your EC2 instance after you created it. But it will change the public IP, so make sure you add it in your forge -> server -> meta (left menu), and the A DNS record require updates.
:::

As soon as you decided with the EC2 instance, let's create it via forge:

![Create Server](./img/forge-create-server.png)

### Create site

We're ready to create a site into forge. The name of the site should match the domain name. 

Let's say you have the domain `sample` and your site should be the `api` of that web application:

![Forge Create Site](./img/forge-new-site.png)

### SSH access

You always need ssh access to your instance/sites. For that you have to add your public key to forge: 

![Create Server](./img/forge-ssh.png)

Now you can ssh login: 

`ssh forge@<SERVER_IP>`

### GIT connect

For the deployment, you need to connect the server with your GIT (VSC) repository:

![Git](./img/forge-git.png)

### DNS record

In terms of having the website or web API www public, we need an A record setup.

 Ask the domain owner to add an A record with the server IP (from Forge) and subdomain value into his DNS provider (ie `A 1.2.3.4 api.sample.com`)
 
 The propagation usually take around 1hour (even officially it says around 24h).
